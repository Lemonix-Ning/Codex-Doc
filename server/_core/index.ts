import "dotenv/config";

// Set NODE_ENV if not already set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import express from "express";
import { createServer } from "http";
import net from "net";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Export API for PDF/PNG generation
  app.post('/api/export', async (req, res) => {
    const { html, format } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    let browser = null;
    try {
      const isProduction = process.env.NODE_ENV === 'production';
      
      // For development, try to find Chrome/Chromium on the system
      let executablePath: string;
      if (isProduction) {
        executablePath = await chromium.executablePath();
      } else {
        // Common Chrome paths on Windows
        const possiblePaths = [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
          // macOS
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          // Linux
          '/usr/bin/chromium-browser',
          '/usr/bin/chromium',
          '/usr/bin/google-chrome',
        ];
        
        const fs = await import('fs');
        executablePath = possiblePaths.find(path => {
          try {
            return fs.existsSync(path);
          } catch {
            return false;
          }
        }) || possiblePaths[0]; // Fallback to first path
      }

      browser = await puppeteer.launch({
        args: isProduction ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: true,
      });

      const page = await browser.newPage();
      
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Inject CSS reset to ensure consistent rendering
      await page.addStyleTag({
        content: `
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
          }
          
          /* Force print-layout-grid to use flex layout */
          @media print, screen {
            .print-layout-grid {
              display: flex !important;
              flex-direction: row !important;
              gap: 20px !important;
            }
            
            .print-layout-grid.flex-col {
              flex-direction: row !important;
            }
            
            .print-layout-grid > div:first-child,
            .print-layout-grid > div:nth-child(1) {
              flex: 0 0 65% !important;
              max-width: 65% !important;
              width: 65% !important;
            }
            
            .print-layout-grid > div:last-child,
            .print-layout-grid > div:nth-child(2) {
              flex: 0 0 32% !important;
              max-width: 32% !important;
              width: 32% !important;
            }
            
            .print-layout-grid > div.w-full {
              width: auto !important;
            }
            
            /* Force Tailwind responsive classes to work */
            .md\\:flex-row {
              flex-direction: row !important;
            }
            .md\\:w-\\[70\\%\\] {
              width: 70% !important;
            }
            .md\\:w-\\[30\\%\\] {
              width: 30% !important;
            }
            .md\\:text-right {
              text-align: right !important;
            }
            .md\\:justify-end {
              justify-content: flex-end !important;
            }
          }
        `
      });

      // Wait for external resources (fonts, CDN scripts) to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (format === 'pdf') {
        // Emulate print media for proper PDF rendering
        await page.emulateMediaType('print');
        
        // Debug: Log computed styles to check if Tailwind classes are applied
        const debugInfo = await page.evaluate(() => {
          const container = document.querySelector('.print-layout-grid');
          if (container) {
            const styles = window.getComputedStyle(container);
            return {
              display: styles.display,
              flexDirection: styles.flexDirection,
              gap: styles.gap,
              firstChildWidth: window.getComputedStyle(container.children[0] as Element).width,
              lastChildWidth: window.getComputedStyle(container.children[1] as Element).width,
            };
          }
          return null;
        });
        console.log('PDF Layout Debug:', debugInfo);
        
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          preferCSSPageSize: true,
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
        res.send(Buffer.from(pdfBuffer));
      } else if (format === 'png') {
        const screenshotBuffer = await page.screenshot({
          fullPage: true,
          type: 'png',
          omitBackground: false,
        });

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=document.png');
        res.send(Buffer.from(screenshotBuffer));
      } else {
        res.status(400).json({ error: 'Invalid format. Supported formats: pdf, png' });
      }

    } catch (error) {
      console.error('Export error:', error);
      res.status(500).json({ error: 'Export failed', details: error instanceof Error ? error.message : String(error) });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

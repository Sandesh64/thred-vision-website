import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function facilityImageUploadPlugin(): Plugin {
  return {
    name: 'facility-image-upload',
    configureServer(server) {
      server.middlewares.use('/api/upload-facility-image', (req, res) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
          req.on('end', () => {
            try {
              const rawBody = Buffer.concat(chunks).toString('utf-8');
              const { base64 } = JSON.parse(rawBody);
              if (base64) {
                const imgBuffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const targetFiles = [
                  path.resolve(__dirname, 'public/WhatsApp Image 2026-10-19 at 5.34.54 PM.jpeg'),
                  path.resolve(__dirname, 'public/facility-exterior.jpg'),
                  path.resolve(__dirname, 'public/Screenshot 2026-10-12 151030.png'),
                  path.resolve(__dirname, 'public/screenshot-1.png'),
                  path.resolve(__dirname, 'public/factory-hero.jpg'),
                  path.resolve(__dirname, 'public/pdf_img_0.jpg'),
                ];
                for (const target of targetFiles) {
                  fs.writeFileSync(target, imgBuffer);
                }
                // Trigger PDF rebuild
                exec('node scripts/generate-profile-pdf.cjs', (err, stdout, stderr) => {
                  if (err) {
                    console.error('PDF generation error:', err);
                  } else {
                    console.log('PDF rebuilt successfully with exact uploaded image:', stdout);
                  }
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Image successfully saved and PDF updated' }));
                return;
              }
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing base64 data' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), facilityImageUploadPlugin()],
    base: '/thred-vision-website/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

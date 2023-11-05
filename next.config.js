/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
    env: {
      BRIGHTOFFICE_Image_URL:process.env.BRIGHTOFFICE_Image_URL || '',
BRIGHTOFFICE_API_URL:process.env.BRIGHTOFFICE_API_URL || '',
BRIGHTOFFICE_API_USERNAME:process.env.BRIGHTOFFICE_API_USERNAME || '',
BRIGHTOFFICE_API_PASSWORD:process.env.BRIGHTOFFICE_API_PASSWORD || '',
    }
}

module.exports = nextConfig

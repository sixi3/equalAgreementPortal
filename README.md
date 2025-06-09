# ID Verification Agreement Portal

A self-service portal for clients to create customized ID verification agreements with real-time PDF preview and download functionality.

## Features

- **Brand Customization**: Upload company logo and enter brand name
- **Service Selection**: Choose from various ID verification checks with pricing
- **Real-time Preview**: Live PDF preview that updates as you make changes
- **Instant Download**: Generate and download customized agreements
- **Professional Design**: Clean, responsive interface with professional styling

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: pdf-lib
- **File Upload**: react-dropzone
- **Data Processing**: papaparse (for CSV parsing)
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eqAgreementPortal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
├── lib/               # Utility libraries and configurations
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Code Quality

This project follows the coding standards defined in `cursor-rules.md`. Please ensure all code:

- Uses TypeScript with proper type definitions
- Follows ESLint and Prettier configurations
- Includes appropriate tests
- Follows security best practices
- Maintains accessibility standards

## Contributing

1. Follow the guidelines in `cursor-rules.md`
2. Create feature branches from `main`
3. Write tests for new functionality
4. Ensure all linting passes
5. Submit pull requests for review

## Security

- Input validation and sanitization
- Secure file upload handling
- XSS protection
- HTTPS enforcement in production
- Security headers configured

## License

[License information to be added]

## Support

For questions or issues, please contact [support contact to be added]. 
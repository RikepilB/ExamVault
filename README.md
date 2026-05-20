# ExamVault

Intelligent exam management platform for educators. Create, manage, and analyze exams with automated variant generation and OMR-ready exports.


## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for development)
- Python 3.11+ (for development)

### One-Command Setup

```bash
# Clone the repository
git clone <repository-url>
cd ExamVault

# Start all services
docker-compose up --build
```

Access the application at: http://localhost

## 📦 Installation

### Option 1: Docker (Recommended)

```bash
# Build and start all services
make up-build

# Or using docker-compose directly
docker-compose up --build -d
```

### Option 2: Local Development

```bash
# Backend Setup
cd app/backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser

# Frontend Setup
cd ../frontend
npm install
npm run dev
```

## 🎮 Usage

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Main Application | http://localhost | React frontend |
| API Documentation | http://localhost/api/ | REST API endpoints |
| Admin Dashboard | http://localhost/admin-panel/ | React admin interface |
| Django Admin | http://localhost/admin/ | Django admin panel |
| PgAdmin | http://localhost:5050 | Database management |

### Initial Admin Access (Local Development Only)

Create your own admin credentials in your local `.env` file:

```bash
DJANGO_SUPERUSER_EMAIL=[your-admin-email]
DJANGO_SUPERUSER_NAME=[your-admin-username]
DJANGO_SUPERUSER_PASSWORD=[strong-random-password]
```


### Core Workflows

#### 1. Course Management
```
Admin/Instructor → Create Course → Add Students → Create Question Banks → Create Exams
```

#### 2. Question Banking
```
Instructor → Import Questions → Categorize → Review → Add to Bank
```

#### 3. Exam Creation & Export
```
Instructor → Start Wizard → Configure Settings → Generate Variants → Export PDF/DOCX
```

#### 4. Results Upload & Analytics
```
Instructor → Upload OMR Results → View Analytics → Export Reports → Analyze Performance
```

## 📚 API Documentation

### Authentication

All API endpoints require authentication via JWT tokens:

```bash
# Login to get token
curl -X POST http://localhost/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/` | POST | Authentication endpoints |
| `/api/courses/` | GET/POST | Course management |
| `/api/questions/` | GET/POST | Question banking |
| `/api/exams/` | GET/POST | Exam management |
| `/api/results/` | GET/POST | Exam results |
| `/api/analytics/` | GET | Analytics data |

### Example API Usage

```bash
# Get all courses
curl -H "Authorization: Bearer <token>" \
  http://localhost/api/courses/

# Create a new question
curl -X POST -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"question_text": "What is...", "type": "multiple_choice"}' \
  http://localhost/api/questions/
```

## 🧪 Testing

### Quick Start

```bash
# Run all tests
make test-all

# Run with coverage
make coverage-all
```

### Documentation

- **[User Workflows Guide](docs/USER_WORKFLOWS.md)** - Step-by-step user workflows for admins and instructors
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete API reference and endpoint documentation
- **[Testing Guide](docs/TESTING_GUIDE.md)** - Comprehensive testing procedures and commands
- **[Troubleshooting Guide](docs/TROUBLESHOOTING_GUIDE.md)** - Common issues and solutions
- **[Exam Creation Guide](docs/EXAM_CREATION_GUIDE.md)** - Complete exam creation workflow and algorithm details

### Test Coverage

- **Backend**: Comprehensive Django test suite
- **Frontend**: Vitest with React Testing Library
- **Integration**: End-to-end testing scenarios

## 🚀 Deployment
### Recommended Portfolio Deployment

This project is full-stack, so static hosting alone is not enough for the complete app.

1. **Frontend**: Deploy `app/frontend` to Vercel  
   - Build command: `npm run build`  
   - Output directory: `dist`  
   - Set `VITE_API_BASE_URL=https://<your-backend-domain>/api`

2. **Backend**: Deploy `app/backend` on a Python host (for example Render/Railway/Fly.io)  
   - Set `DEBUG=False` and a strong `SECRET_KEY`  
   - Configure `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`  
   - Run migrations during deployment

3. **Database**: Use Neon Postgres (serverless)  
    - Set `DATABASE_URL` in backend environment variables  
    - Keep SSL enabled (`sslmode=require`)

4. **Smoke Test**  
   - Verify `/api/health/`, login flow, course/exam creation, and results upload/analytics

### Environment Variables

```env
Check .env.example file
```

### GitHub Pages Note

GitHub Pages is suitable only for a static portfolio/landing page. It cannot run the Django backend for this application.

## 🛠️ Development

### Development Commands

```bash
# Build containers
make build

# Start development environment
make up

# Run migrations
make migrate

# View logs
make logs

# Access shells
make shell-backend
make shell-frontend
make shell-db
```

### Code Quality

```bash
# Backend formatting
make format-backend

# Frontend linting
make lint-frontend

# Run all quality checks
make quality-check
```

## 📁 Project Structure

```
ExamVault/
├── app/                          # Main application
│   ├── backend/                  # Django backend
│   │   ├── courses/             # Course management
│   │   ├── exams/               # Exam system
│   │   ├── questions/           # Question banking
│   │   ├── users/               # User management
│   │   ├── results/             # Exam results
│   │   ├── analytics/           # Analytics & reporting
│   │   └── tests/               # Backend tests
│   └── frontend/                # React frontend
│       ├── src/
│       │   ├── pages/           # Page components
│       │   ├── components/      # Reusable components
│       │   ├── api/             # API integration
│       │   └── types/           # TypeScript definitions
│       └── public/              # Static assets
├── docs/                        # Documentation
├── nginx/                       # Web server configuration
├── scripts/                     # Utility scripts
└── docker-compose.yml           # Container orchestration
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Write tests** for new functionality
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Coding Standards

- **Backend**: Follow PEP 8 and Django best practices
- **Frontend**: Use ESLint and Prettier configurations
- **Testing**: Maintain >80% test coverage
- **Documentation**: Update docs for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django and React communities
- Educational technology research
- Open source contributors

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](docs/)
- Review the [troubleshooting guide](docs/TROUBLESHOOTING_GUIDE.md)

---

**ExamVault** - Empowering education through intelligent exam management.

[![ExamVault](https://img.shields.io/badge/ExamVault-v1.0.0-blue.svg)](https://github.com/RikepilB/ExamVault)

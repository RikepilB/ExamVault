set -e

echo "Waiting for database..."
sleep 5

echo "Running migrations..."
python manage.py migrate

if [ "${SEED_SUPERUSER_ON_STARTUP:-true}" = "true" ]; then
  echo "Seeding superuser..."
  python manage.py seed_superuser
else
  echo "Skipping superuser seed (SEED_SUPERUSER_ON_STARTUP=false)"
fi

echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000
#!/usr/bin/env bash
set -euo pipefail

# setup_and_run.sh
# Automates project setup for the Assignment App (install deps, fix expo packages,
# install/clear watchman, increase ulimit, optional system limit, and start Expo).

PROJECT_DIR="/Users/v.saikiranreddy/Desktop/mobile_app developer"

usage() {
  cat <<EOF
Usage: $0 [--no-start]

Options:
  --no-start   Run setup steps but do not start the Expo dev server.
EOF
}

START_SERVER=1
if [[ ${1:-} == "--no-start" ]]; then
  START_SERVER=0
fi

echo "Running setup for project: $PROJECT_DIR"

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "ERROR: project directory does not exist: $PROJECT_DIR" >&2
  exit 1
fi

cd "$PROJECT_DIR"

echo "1) Cleaning previous installs..."
rm -rf node_modules package-lock.json

echo "2) Installing npm dependencies..."
npm install

echo "3) Letting Expo install native-compatible packages..."
# prefer --fix to align versions; fallback to plain install if not supported
if command -v npx >/dev/null 2>&1; then
  npx expo install --fix || npx expo install || true
else
  echo "npx not found; please install Node.js and npm (or use nvm)." >&2
fi

echo "4) Watchman: checking installation..."
if command -v watchman >/dev/null 2>&1; then
  echo "watchman is installed. Clearing watchman state..."
  watchman watch-del-all || true
else
  if command -v brew >/dev/null 2>&1; then
    echo "watchman not found. Installing via Homebrew... (may ask for password)"
    brew install watchman || echo "brew install watchman failed. Please install watchman manually."
  else
    echo "Homebrew not found. To install watchman, install Homebrew and then run: brew install watchman"
  fi
fi

echo "5) Increasing per-shell open-file limit (temporary for this session)..."
CURRENT_ULIMIT=$(ulimit -n || echo "unknown")
echo "Current ulimit -n: $CURRENT_ULIMIT"
ulimit -n 8192 || echo "Could not increase ulimit here; you can run 'ulimit -n 8192' in this terminal."

echo "6) Optionally update system-wide maxfiles (requires sudo)."
read -p "Apply 'sudo launchctl limit maxfiles 524288 524288' now? [y/N]: " apply_sys_limit
apply_sys_limit=${apply_sys_limit:-N}
if [[ "$apply_sys_limit" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo "Applying system-wide maxfiles (will ask for your password)..."
  sudo launchctl limit maxfiles 524288 524288 || echo "launchctl command failed or not permitted."
else
  echo "Skipped system-wide limit change. You can run it manually if needed."
fi

if [[ $START_SERVER -eq 1 ]]; then
  echo "7) Starting Expo dev server..."
  echo "If you prefer to start manually, re-run with --no-start."
  npm run start
else
  echo "Setup complete. Skipping starting the Expo dev server (--no-start provided)."
fi

echo "All done."

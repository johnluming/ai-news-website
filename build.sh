#!/usr/bin/env bash
# Build frontend
npm install
npm run build
# Build backend
cd backend
npm install
npm run build

#!/bin/bash
echo "Creating Todo..."
CREATE_RES=$(curl -s -X POST http://localhost:3001/api/v1/todos -H "Content-Type: application/json" -d '{"title": "Test Todo", "description": "This is a test todo"}')
echo $CREATE_RES
ID=$(echo $CREATE_RES | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo "Created ID: $ID"

echo "Getting Todos..."
curl -s http://localhost:3001/api/v1/todos

echo "Updating Todo..."
curl -s -X PATCH http://localhost:3001/api/v1/todos/$ID -H "Content-Type: application/json" -d '{"completed": true}'

echo "Getting Todo by ID..."
curl -s http://localhost:3001/api/v1/todos/$ID

echo "Deleting Todo..."
curl -s -X DELETE http://localhost:3001/api/v1/todos/$ID

echo "Getting Todos (should be empty/less)..."
curl -s http://localhost:3001/api/v1/todos

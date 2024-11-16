osrm server in 5001 = docker run -t -i -p 5001:5000 -v "$(pwd):/data" osrm/osrm-backend osrm-routed --algorithm mld /data/southern-zone-latest.osrm
frontend in 3000 = npm
backend in 5002 = models and flask

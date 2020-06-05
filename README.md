# Campervan App

An app to plan and record your campervan/motorhome trips around NZ & Australia

## User Stories

- [x] Authenticate users ("regular" user, moderator, admin roles)
- [ ] Users can CRUD trips
- [ ] Moderator users can CRUD places of interest (POIs)

## Data entities

- [x] User
- [ ] Trip
- [ ] POI

## Trips

- [ ] \(v0.1) Trips made of waypoints specified by the user
- [ ] \(v0.2) Media (photos, videos) and comments for trip waypoints
- [ ] \(v0.3) Trip settings (e.g. daily distance quota, timeframes)
- [ ] \(v0.4) POI recommendations for trips based on trip settings and user interests

## Stack

- Database: MongoDB
- REST API: Nest.js
- Frontend: HTML+CSS+jQuery for a quick proof-of-concept, then I will probably port it over to something like Ionic or React
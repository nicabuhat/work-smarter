# Scooby Work Smarter Tool

## Sections

#### Top Categories

- Publisher 1P Data => extendable cols
- Search Intent => unique col
- Contextual+ => extendable cols
- 3P Audience Segments => unique col

#### Country

- ISO 2 letter format

#### Pricing and Volume

- Banner Volume 70% VR => manual input
- CPM / Bid Guidance => automated from table
- Video Volume 70% VR => computed 55% banner
- CPM / Bid Guidance => automated from table
- Native Volume 70% VR => computed 15% video
- CPM / Bid Guidance => automated from table

#### Publisher and Subcategories

- automated from excel table => needs filter

#### Search Intent

- manual input of keywords

#### Domains

- automated from excel table => needs filter

#### Logo

- manual upload

## Requirements

#### Files

- [] master template
- [] CPM pricing from pptx
- [] Publisher Deal Bible from xlsx
- [] Domain List from xlsx

#### Database

- [x] countries ISO 2 letter format
- [x] DB table for the pricing
- [] DB table for the domains

## Components

- [x] country dropdown
- category selection
  - create column
  - [] Publisher 1P Data, Search Intent, Contextual+, 3P Audience Segments
    - [] category
- pricing and volume selection
  - [] automated pricing data for selected country
  - [] manual volume selection
- publisher and subcategories
  - [] generate list from excel pivot table
  - [] filter list
- domains
  - [] generate list from excel file
  - [] list total
- keywords
  - [] manual input for the list

# Zegen
The API Browsing History / Collaborative Filtering / Ranking / Pageview for whatever you want

Check [postman](https://raw.githubusercontent.com/sideroad/zegen/master/Zegen.postman_collection) file more detail.

## Parameters

#### service
Please specify service ID.
Browsing history is not store across services.

#### user
Please specify unique user ID.
The ID should NOT duplicate in same service.

#### item
Please specify unique item ID.
The ID should NOT duplicate in same service.

## Browsing History
Provide user histories, put history, delete history or histories for user.

## Collaborative Filtering
The API response item based collaborative filtering data by requested item

## Ranking
The API response browsing history ranking data by specified period.

## Pageview
The API response browsing history ranking data by specified period and item.

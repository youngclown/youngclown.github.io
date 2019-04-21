---
layout: post
title: "assets_Request"
comments: true
---
Native Ad Request Markup object
----

타불라 네이비트 광고의 Request 요청 처리안 스펙정의값
----

The Native Object defines the native advertising opportunity available for bid via this bidrequest.   
The Taboola Open RTB will supply this as a JSON-encoded string.  
Every Taboola inventory item will call for six assets to be returned in the response: A title, an image (for the thumbnail), brand name, description, the price of the product and a privacy link.  
Out of the six only the first two are mandatory, and the others optional.  
All are described in further details in the following sections.  

Json 안에 String 화된 Json 이 다시 구현되어있는 구조.

Asset object - title
----
    - Describes the need for the bid creative to contain a title.
{"id":1,"required":1,"title":{"len":1500}}
id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 1
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 1
title : d Title object - contains a single field defining the maximal allowed length of the title:
        Field name: len
        Field type: Int
       - Will be set to 90 by default.

Asset object - img
----
   - Describes the need for the bid creative to contain an image, that will serve as the creative’s thumbnail.
{"id":2,"required":1,"img":{"type":3,"wmin":1,"hmin":1}}
id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 2
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 1
img : img object will contain three (int type) fields:
      wmin - the minimum requested width of the image in pixels.
      hmin - the minimum requested height of the image in pixels
      type - the type ID of the image element supported by the publisher
      - Type value will always be set to 3 (“Large image preview for the ad”)

Asset object - brand name
----
  - Describes the need for the bid creative to contain a branding text. If no brand name will be supplied, the advertiser domain will be used by Taboola instead.
{"id":3,"required":0,"data":{"type":1,"len":200}}
id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 3
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 0
data : data object will contain two
      fields (of type int):
      Field name - type
      Field name - len
      - ‘type’ value will always be set to 1, which states ‘Sponsored By message where response should contain the brand name of the sponsor’ len represents the maximal allowed length for the brand name.

Asset object - description
----
Describes the need for the bid creative to contain a descriptive text.
{"id":4,"required":0,"data":{"type":2,"len":15000}}

id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 4
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 0
data : data object will contain two
      fields (of type int):
      Field name - type
      Field name - len
      - ‘type’ value will always be set to 2, which states ‘Descriptive text associated with the product or service being advertised. Longer length of text in response may be truncated or ellipsed by the exchange’ len represents the maximal allowed length for the description.

Asset object - price
----
- Describes the option for the bid creative to contain a price, in case the bidder is offering a product ad.
{"id":5,"required":0,"data":{"type":6,"len":60}}

id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 5
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 0
data : data object will contain one field :
      Field name - type
      Field value - int
      - Value will always be set to 6, which states ‘Price for product / app / in-app purchase. Value should include currency symbol in localized format

Asset object - privacy link
----
- In some cases the bidder might be willing to supply a link to its privacy policy opt out mechanism, as part of the creative. In case this asset is incorporated in the response, the Taboola exchange will use this link as opt-out parameters, which will be concatenated to a domain name agreed upon prior to setting up the RTB integration. The result is what the user will be redirected to when interacting with the Taboola AdChoices icon for that slot. For more details please contact Taboola product team.
{"id":6,"required":0,"data":{"type":500}}

id : Unique asset ID, assigned by exchange. Typically a counter for the array
       - Value will be set to 6
required : Set to 1 if asset is required (exchange will not accept a bid without it)
       - Value will be set to 0
data : data object will contain one field:
      Field name - type
      Field value - string
      - Value will always be set to 500

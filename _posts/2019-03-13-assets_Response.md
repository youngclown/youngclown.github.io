---
layout: post
title: "assets_Response"
comments: true
---
Native Link object (adm object)
----

타불라 네이비트 광고의 Response 요청 처리안 스펙정의값
----

The native ad markup object is the top level JSON object which identifies a native response. Each asset within the asset array corresponds to the Asset Object in the request. The main container object for each asset requested or supported by Exchange on behalf of the rendering client. Out
of the six possible assets only title and img are mandatory.
The Taboola Open RTB supports this either as a JSON-encoded string, or a formal object.
For video, the inline VAST document in the adm attribute constitute the ad markup

adm object
----
"link" -> "{"url":"https://partneradvertiser.com/url/data/com","clicktrackers":[]}"

"imptrackers" -> "["http://partnerimptrackerurl.com/imp/trackers/{AUCTION_PRICE}"]"

assets : List of native ad’s assets
link : Destination Link. This is the link object for the ad.
imptrackers : Array of impression tracking URLs, expected to return a
1x1 image or 204 response
    - This is one of the possible means for conveying win notifications to the exchange partner. Taboola Open RTB Exchange will replace macros defined within the URL as specified under table 4.2.5 in this specification, or with an empty string if unavailable. Up to 4 tracking URLs will be allowed. The impression tracker is limited to 3000 characters

Native Link object
----



URL : Landing URL of the clickable link.
clicktrackers : List of third-party tracker URLs to be fired on click of the URL.
    - Taboola Open RTB Exchange will replace macros defined within the URL as specified under table 4.2.5 in this specification, or with an empty string if unavailable. Up to 3 tracking URLs will be allowed. If more than three exist, only the first 3 will be fired.

> landing url 에 대한 유효 클릭에 대한 대응 처리에 대한 방안이 고려되어야함.

Native asset object - title
----
{"id":1,"title":{"text":"Some site title - Some site titile"},"img":null,"data":null,"video":null}

id : the asset IDs in request
     - 1
title : Contains a single (string typed) field, named ‘text’ which contains the text associated with the title element
     - 40 characters, after which “...” are added

Native asset object - img
----
{"id":2,"title":null,"img":{"url":"http://somesitename.com/images/img.jpg","w":600,"h":500},"data":null,"video":null}

id : the asset IDs in request
     - 2
img : url : URL of the image asset
          - The image URL is limited to 1024 characters
      w : Optional
      h : Optional

Since the Taboola network’s supply consists of native placements the use of h,w parameters are highly recommended. They allow the Taboola algorithm to optimize the the processing of the source image so that it optimally fits into the (possibly varying) placement dimensions. In some cases, we might also choose to reject the bid, if we suspect that the difference between source and target dimension would inevitably create a bad user experience and low engagement chances, which would be inefficient both for the Publisher hosting that placement and the Taboola exchange partner.

Native asset object - brand name
----
{"id":3,"title":null,"img":null,"data":{"value":"Some site name"},"video":null}

id : the asset IDs in request
     - 3
data : Contains a single (string typed) field, named ‘value’ which contains the text associated with the brand name element

Native asset object - description
----
{"id":4,"title":null,"img":null,"data":{"value":"site description and other information provided"},"video":null}

id : the asset IDs in request
     - 4
data : Contains a single (string typed) field, named ‘value’ which contains the text associated with the description element

Native asset object - price
----
id : the asset IDs in request
     - 5
data : Contains a single (string typed) field, named ‘value’ which contains the text associated with the price element
     - As stated above, value should include currency symbol in localised format. Limited to 40 characters.

Native asset object - privacy link
----
id : the asset IDs in request
     - 6
data : Contains a single (string typed) field, named ‘value’ which contains the text to be concatenated to the partner domain. Combined, they create the privacy link URL which will be incorporated in the widget opt-out AdChoices icon

Native asset object - video
----
vasttag :  vast xml
     - 7

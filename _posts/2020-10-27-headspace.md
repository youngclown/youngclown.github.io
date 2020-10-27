---
layout: post
title: "E11000 duplicate key"
date: 2020-10-27 09:25:00 +0900
comments: true
---

```
2020-10-26T22:15:29.033+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:15:55.692+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:16:22.884+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:16:50.175+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:17:17.405+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:17:44.653+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:18:10.891+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:18:37.264+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:19:04.515+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }
2020-10-26T22:19:31.047+0900 I SHARDING [chunkInserter] Batch insertion failed  :: caused by :: DuplicateKey: E11000 duplicate key error collection: user_mapping.auth_id_info index: _id_ dup key: { : ObjectId('5d5e75b2b26437e191d4040b') }

```

db.getCollection('auth_id_info').find({_id:ObjectId("5d5e75b2b26437e191d4040b")})
로 검색시, 두개의 값이 나오는 것을 확인할 수 있었으며,

해당 키를 삭제하면 해결됩니다.

다만, 키가 동일하므로 두개의 값이 다 삭제될 수 있으므로, 해당 데이터를 백업해야할 수 있습니다!

// Returns 'user' data purely from logs.
db.logs.aggregate({
  $group: {
    "_id": {user: "$user", type: "$type"},
    "pages": {$sum: 1},
    "starttime": {$min: "$starttime"},
    "endtime": {$max: "$endtime"},
    "unit": {$first: "$unit"}
  }
}, {
  $group: {
    "_id": "$_id.user",
    "types": {$push: {
      "type": "$_id.type",
      "pages": "$pages",
      "starttime": "$starttime",
      "endtime": "$endtime",
      "unit": "$unit"
    }}
  }
});

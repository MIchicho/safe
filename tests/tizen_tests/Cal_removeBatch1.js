/*******************************************************************************
    Copyright (c) 2013, S-Core.
    All rights reserved.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.
 ******************************************************************************/
var __result1, __result2;
// Defines the error callback.
  function errorCallback(response) {
     __result1 = response.name;
  }

  // Defines the removeBatch callback
  function removeBatchCallback() {
     __result2 = 1;
  }

  // Defines the event search success callback.
  function eventSearchSuccessCallback(events) {
    // Deletes the first two existing events.
    myCalendar.removeBatch([events[0].id, events[1].id],
                           removeBatchCallback,
                           errorCallback);
  }

  // Gets default calendar
  myCalendar = tizen.calendar.getDefaultCalendar("EVENT");

  // Retrieves all events in Calendar
  myCalendar.find(eventSearchSuccessCallback, errorCallback);

  var __expect1 = "Error"
  var __expect2 = 1
import window from 'my-global';
import {Eventable} from 'my-event';
var STORAGE = Eventable({});
if ('localStorage' in window) {
  var localStorage = window.localStorage;
  Object.assign(STORAGE, {
    isNative: true,
    get: function(id) {
      var value;
      try {
        value = localStorage.getItem(id);
      } catch(e) {
        STORAGE.trigger({
          type: 'error',
          method: 'get',
          data: {e, id}
        });
      }
      return value;
    },
    set: function(id, value){
      try {
        localStorage.setItem(id, value);
      } catch(e) {
        STORAGE.trigger({
          type: 'error',
          method: 'set',
          data: { e, id, value}
        });
      }
    },
    remove: function(id) {
      try {
        localStorage.removeItem(id);
      } catch(e) {
        STORAGE.trigger({
          type: 'error',
          method: 'remove',
          data: { e, id}
        });
      }
    }
  });
} else {
  Object.assign(STORAGE, {
    isNative: false,
    _data: {},
    set: function (id, val) {
      this._data[id] = String(val);
    },
    get: function (id) {
      return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
    remove: function (id) {
      return delete this._data[id];
    },
    clear: function () {
      this._data = {};
    }
  });
}
export default STORAGE;

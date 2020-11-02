import _ from "lodash";
import router from "@/router";
import api from "@/axios/api.js";

// axios.defaults.baseURL = "https://fitkidcateringapp.azurewebsites.net";
// axios.defaults.headers.post["Content-Type"] = "application/json-patch+json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default {
  login(cb, data) {
    api
      .post(`/api/user/authenticate`, {
        Username: data.username,
        Password: data.password
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response));
  },
  register(cb, data) {
    api
      .post(`/api/user`, {
        UserName: data.username,
        Password: data.password,
        Email: data.email,
        FirstName: data.firstname,
        LastName: data.lastname
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response));
  },
  refreshToken(cb, data) {
    api
      .post(`/api/user/authenticate/recover`, {
        Token: data.ref
      })
      .then(response => {
        cb(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      })
      .catch(e => cb(e.response));
  },
  getUserPermissions(cb, data) {
    api
      .get(`/api/admin/permissions/inspect/${data.id}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response));
  },
  setUserPermissions(cb, data) {
    console.log(data);
    api
      .post(`/api/admin/permissions/inspect/${data.id}`, [
        {
          key: data.key,
          value: {
            AdminAccess: data.AdminAccess === true ? "Allow" : "Deny",
            UserAccess: data.UserAccess === true ? "Allow" : "Deny"
          }
        }
      ])
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response));
  },
  getUsers(cb, data) {
    api
      .get(`api/admin/users`, {
        params: {
          limit: 0,
          UserName: data.UserName,
          Email: data.Email,
          Name: data.LastName
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e.response);
      });
  },
  getPermissions(cb) {
    api
      .get(`/api/admin/permissions`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e.response);
      });
  },
  getUserInfo(cb) {
    api
      .get("me")
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e.response.data.error);
      });
  },
  getAlbums(cb) {
    api
      .get("me/playlists")
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  getPlaylistSongs(cb, type) {
    api
      .get(type + "s/" + router.apps[0].$route.params.id + "/tracks")
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  playSong(cb, data) {
    api
      .put(
        `me/player/play?device_id=${data.id}`,
        data.track.position != undefined
          ? {
              uris: data.track.uris,
              offset: { position: data.track.position }
            }
          : {
              uris: [data.track.uri]
            }
      )
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  playPlaylist(cb, data) {
    api
      .put(`me/player/play?device_id=${data.id}`, {
        context_uri: data.uri
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  getSavedTracks(cb) {
    api
      .get(`me/tracks`, {
        limit: 50
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  getRecomendations(cb) {
    api
      .get(`me/top/tracks`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  getFeaturedPlaylists(cb) {
    api
      .get(`browse/featured-playlists`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  playShuffle(cb, data) {
    api
      .put(`me/player/shuffle?state=${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  /**
   * @param {Function} cb - CallBack Function to get server response
   * @param {String} data - Repeat mode
   */
  playRepeat(cb, data) {
    api
      .put(`me/player/repeat?state=${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  /**
   * @param {Function} cb - CallBack Function to get server response
   * @param {String} data - ID of song to save to liked songs
   */
  saveTracks(cb, data) {
    api
      .put(`me/tracks`, {
        ids: [data]
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  deleteTracks(cb, data) {
    api
      .delete(`me/tracks?ids=${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  addToQueue(cb, data) {
    api
      .post(`me/player/queue?uri=${data.uri}&device_id=${data.id}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  },
  checkSavedTracks(cb, ids) {
    ids = ids.join(",");
    api
      .get(`me/tracks/contains?ids=${ids}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => cb(e.response.data.error));
  }
};

export default function(context, inject) {
  const appId = "B09NQUJ7M3";
  const apiKey = "25a73548fb82a4293fb56ba545ce709f";
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
  });

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          { headers }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radiusInMeters,
            hitsPerPage: 10,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unwrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText,
    };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    };
  }
}

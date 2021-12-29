import axios from "axios";
import { USERNAME, BASE_URL, PAT } from "../constants/index";
import { dataType } from '../types/index';

declare module 'axios' {
  interface AxiosRequestConfig {
    gist_id?: string;
    username?: string;

  }
}

export const loginAuthUser = async (UserName: string) => {
  const authUserRecord = await axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then(resp => resp?.data)
    .catch(err => err);
  return authUserRecord;
};

export const publicGistsRecord = async () => {
  const publicGistsRecords = await axios
    .get(`${BASE_URL}/gists`)
    .then((resp) => resp?.data).catch(err => err);
  return publicGistsRecords;
};

export const getPublicGist = async (id: string) => {
  const getPublicGistObj = await axios
    .get(`${BASE_URL}/gists/${id}`, {
      gist_id: id,
    })
    .then((resp) => resp.data).catch(err => err);
  return getPublicGistObj;
};

export const privateGistsRecord = async () => {
  const privateGistsRecord = await axios
    .get(`${BASE_URL}/gists?per_page=10`, {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data).catch(err => err);
  return privateGistsRecord;
};

export const searchRecords = async (name: string) => {
  const searchedUserRecords = await axios
    .get(`${BASE_URL}/users/${name}/gists`, {
      username: name,
    })
    .then(resp => resp?.data)
    .catch(err => err);
  return searchedUserRecords;
};

export const createAGist = async (data: dataType) => {
  const json = JSON.stringify(data);
  const createGist = axios
    .post(`${BASE_URL}/gists`, json, {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data).catch(err => err);
  return createGist;
};

export const delAGist = async (id: string) => {
  const delAGist = axios
    .delete(`${BASE_URL}/gists/${id}`, {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data).catch(err => err);
  return delAGist;
};

export const updateAGist = async (id: string, disp: string) => {
  const updateGists = await axios.patch(
    `${BASE_URL}/gists/${id}`,
    {
      id: id,
      description : disp
    },
    {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    }
  );
  return updateGists;
};
export const getGistObj = async (id: string) => {
  const getGists = await axios
    .get(`${BASE_URL}/gists/${id} `, {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data).catch(err => err);
  return getGists;
};

export const getStaredGists = async () => {
  const getStaredGists = await axios
    .get(`https://api.github.com/gists/starred`, {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data).catch(err => err);
  return getStaredGists;
};

export const checkGistStared = async (uniqueId: string) => {
  const checkStar = await axios.get(`${BASE_URL}/gists/${uniqueId}/star`, {
    headers: {
      Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
    },
  });
  return checkStar;
};

export const staredAGist = async (gist_id: string) => {
  const starAGist = await axios.put(
    `${BASE_URL}/gists/${gist_id}/star`,
    {
      gist_id: gist_id,
    },
    {
      headers: {
        Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
      },
    }
  );
  return starAGist;
};

export const unStaredAGist = async (gist_id: string) => {
  const unStarAGist = await axios.delete(`${BASE_URL}/gists/${gist_id}/star`, {
    headers: {
      Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
    },
  });
  return unStarAGist;
};

export const forkedGist = async (gist_id: string) => {
  const forkAGist = await axios
    .post(
      `${BASE_URL}/gists/${gist_id}/forks`,
      {
        gist_id: gist_id,
      },
      {
        headers: {
          Authorization: `Basic ${btoa(`${USERNAME}:${PAT}`)}`,
        },
      }
    )
    .then((resp) => resp?.status)
    .catch((err) => err);
  return forkAGist;
};

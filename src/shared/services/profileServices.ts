import { IBackendProfile, IUpdateBackendProfile } from '../types/user';
import { deleteFetch, getFetch, patchFetch, postFetch } from './backendFetcher';

export async function recommendProfile(profileId: string) {
  return postFetch<IBackendProfile>(`/profiles/${profileId}/recommendations`);
}
export async function unRecommendProfile(profileId: string) {
  return deleteFetch<IBackendProfile>(`/profiles/${profileId}/recommendations`);
}

export async function getProfile(profileId: string) {
  return getFetch<IBackendProfile>(`/profiles/${profileId}`);
}

export async function updateMe(profileInfo: IUpdateBackendProfile) {
  return patchFetch<IBackendProfile>('/profiles/me', profileInfo);
}

export async function getMe() {
  return getFetch<IBackendProfile>('/profiles/me');
}

export async function enumerateField(fieldName: string) {
  return getFetch<string[]>(`/profiles/fields/${fieldName}`);
}

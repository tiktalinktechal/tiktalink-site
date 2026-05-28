export type SocialProvider = "instagram";

export type SocialApiSuccess<T> = {
  ok: true;
  provider: SocialProvider;
  data: T;
  requestId: string;
};

export type SocialApiFailure = {
  ok: false;
  provider: SocialProvider;
  error: {
    code: string;
    message: string;
    status: number;
    details?: unknown;
  };
  requestId: string;
};

export type SocialApiResponse<T> = SocialApiSuccess<T> | SocialApiFailure;

export type PublishLifecycleStatus =
  | "container_created"
  | "container_processing"
  | "container_ready"
  | "published"
  | "failed";

export type PublishLifecycleStep = {
  status: PublishLifecycleStatus;
  at: string;
  id?: string;
  detail?: string;
};

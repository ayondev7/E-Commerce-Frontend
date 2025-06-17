export interface AuthResult {
  userType?: "seller" | "customer";
  userId?: string;
  error?: string;
}

export const checkAuth = async (): Promise<AuthResult> => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      return { error: "No token found in sessionStorage" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/auth-check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Failed to authenticate user" };
    }

    return {
      userType: data.userType,
      userId: data.userId,
    };
  } catch (err) {
    return { error: "Network error while checking auth" };
  }
};

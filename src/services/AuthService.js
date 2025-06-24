import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";

const authService = {
  /**
   * Login with email and password.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} return user info and token
   * @throws {Error}
   */

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Authentication service login error:", error);
      throw error;
    }
  },
  /**
   * Login with email and password.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} return user info and token
   * @throws {Error}
   */

  signup: async (name, email, profileImageUrl, password, adminInviteToken) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        email,
        password,
        name,
        profileImageUrl,
        adminInviteToken,
      });

      return response.data;
    } catch (error) {
      console.error("Authentication service login error:", error);
      throw error;
    }
  },
};

export default authService;

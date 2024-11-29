"use client";
import {jwtDecode} from "jwt-decode";

class TokenManager {
    private static isClientSide(): boolean {
        return typeof window !== 'undefined';
    }

    static setAccessToken(accessToken: string): void {
        if (this.isClientSide()) {
            localStorage.setItem('accessToken', accessToken);
        }
    }

    static getAccessToken(): string | null {
        if (this.isClientSide()) {
            return localStorage.getItem('accessToken');
        }
        return null;
    }

    static getProfileData(): any {
        if (this.isClientSide()) {
            const token = localStorage.getItem('accessToken');
            return token ? jwtDecode(token) : null;
        }
        return null;
    }

    static removeAccessToken(): void {
        if (this.isClientSide()) {
            localStorage.removeItem('accessToken');
        }
    }
}

export default TokenManager;

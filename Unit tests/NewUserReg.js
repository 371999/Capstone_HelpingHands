    // Successfully registers a new user with valid data
    it('should register a new user and return a JWT when provided with valid data', async () => {
        const request = {
            body: {
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                gymName: 'Fitness Gym',
                password: 'securePassword123',
                type: 'member'
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        const mockProfileCreate = jest.spyOn(Profile, 'create').mockResolvedValue({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            gymName: 'Fitness Gym',
            password: 'hashedPassword',
            type: 'member'
        });
        const mockFindOne = jest.spyOn(Profile, 'findOne').mockResolvedValue(null);
        const mockGetHashedPassword = jest.spyOn(authService, 'getHashedPassword').mockResolvedValue('hashedPassword');
        const mockGenerateJWTToken = jest.spyOn(authService, 'generateJWTToken').mockReturnValue('fakeJWTToken');

        await userRegistration(request, response, next);

        expect(mockFindOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(mockGetHashedPassword).toHaveBeenCalledWith('securePassword123');
        expect(mockProfileCreate).toHaveBeenCalledWith({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            gymName: 'Fitness Gym',
            password: 'hashedPassword',
            type: 'member'
        });
        expect(mockGenerateJWTToken).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(Constants.STATUSCREATED);
        expect(response.json).toHaveBeenCalledWith({ success: true, JWT: 'fakeJWTToken' });
    });

    // Hashes the password before storing it in the database
    it('should hash the password before storing it in the database', async () => {
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
    });

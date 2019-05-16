import {authorize} from '../users.todo'

describe('Users.authorize', () => {
  describe('when authorization request is made', () => {
    const makeConfig = (reqBody = {}) => {
      return {
        req: {
          ...reqBody,
        },
        res: {
          status: jest.fn().mockReturnValue({
            send: jest.fn(),
          }),
        },
        next: jest.fn(),
      }
    }
    it('should authorize user', () => {
      const config = makeConfig({
        user: {
          id: 1,
        },
        params: {
          id: 1,
        },
      })

      authorize(config.req, config.res, config.next)

      expect(config.next).toHaveBeenCalledWith()
    })

    it('should not authorize user', () => {
      const config = makeConfig({
        user: {
          id: 2,
        },
        params: {
          id: 1,
        },
      })

      authorize(config.req, config.res, config.next)

      expect(config.next).not.toHaveBeenCalled()
      expect(config.res.status).toHaveBeenCalledWith(403)
    })
  })
})

describe('Users.getUsers', () => {
  const makeConfig = () => {
    return {
      req: () => {},
      res: {
        json: jest.fn(),
        status: jest.fn().mockReturnValue({
          send: jest.fn(),
        }),
      },
    }
  }
  describe('when users are in database', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('../../utils/db.js', () => {
        return {
          getUsers: jest.fn().mockResolvedValue([]),
        }
      })
    })

    afterAll(() => {
      jest.unmock('../../utils/db.js')
    })

    it('should respond to request', async () => {
      const Users = require('../users.todo')
      const config = makeConfig()

      await Users.getUsers(config.req, config.res)

      expect(config.res.json).toHaveBeenCalledWith({users: []})
    })
  })

  describe('when database has no users', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('../../utils/db.js', () => {
        return {
          getUsers: jest.fn().mockResolvedValue(false),
        }
      })
    })

    afterAll(() => {
      jest.unmock('../../utils/db.js')
    })

    it('should respond with 404', async () => {
      const Users = require('../users.todo')

      const config = makeConfig()
      await Users.getUsers(config.req, config.res)

      expect(config.res.status).toHaveBeenCalledWith(404)
    })
  })
})

describe('Users.getUser', () => {
  const makeConfig = (reqBody = {}) => {
    return {
      req: {
        ...reqBody,
      },
      res: {
        json: jest.fn(),
        status: jest.fn().mockReturnValue({
          send: jest.fn(),
        }),
      },
    }
  }

  describe('when user is found', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('../../utils/db.js', () => {
        return {
          getUser: jest.fn().mockReturnValue({}),
        }
      })
      jest.mock('../../utils/auth.js', () => {
        return {
          userToJSON: jest.fn().mockReturnValue({}),
          getUserToken: jest.fn().mockReturnValue({}),
        }
      })
    })

    afterAll(() => {
      jest.unmock('../../utils/db.js')
      jest.unmock('../../utils/auth.js')
    })

    it('should respond with user', async () => {
      const Users = require('../users.todo')
      const config = makeConfig({
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      })

      await Users.getUser(config.req, config.res)

      expect(config.res.json).toHaveBeenCalledWith({
        user: {
          token: {},
        },
      })
    })
  })

  describe('when user is not found', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('../../utils/db.js', () => {
        return {
          getUser: jest.fn().mockReturnValue(false),
        }
      })
    })

    afterAll(() => {
      jest.unmock('../../utils/db.js')
    })

    it('should respond with not found', async () => {
      const Users = require('../users.todo')
      const config = makeConfig({
        params: {
          id: 1,
        },
      })

      await Users.getUser(config.req, config.res)

      expect(config.res.status).toHaveBeenCalledWith(404)
    })
  })
})

describe('User.updateUser', () => {
  const makeConfig = (reqBody = {}) => {
    return {
      req: {
        ...reqBody,
      },
      res: {
        json: jest.fn(),
        status: jest.fn().mockReturnValue({
          send: jest.fn(),
        }), 
      },
    };
  };

  describe('when user is not authorized', () => {
    it('should respond with forbidden', async () => {
      const Users = require('../users.todo');

      const config = makeConfig();

      await Users.updateUser(config.req, config.res);

      expect(config.res.status).toHaveBeenCalledWith(403);
    });
  });

  describe('when user is found', () => {
    beforeAll(() => {
      jest.resetModules();
      jest.mock('../../utils/db.js', () => {
        return {
          updateUser: jest.fn().mockResolvedValue({}),
        };
      });
      jest.mock('../../utils/auth.js', () => {
        return {
          userToJSON: jest.fn().mockReturnValue({}),
        }
      })
    });

    afterAll(() => {
      jest.unmock('../../utils/db.js');
      jest.unmock('../../utils/auth.js');
    });

    it('should update user', async () => {
      const Users = require('../users.todo');

      const config = makeConfig({
        user: {
          id: 1,
        },
        params: {
          id: 1,
        },
        body: {},
      });

      await Users.updateUser(config.req, config.res);

      expect(config.res.json).toHaveBeenCalledWith({
        user: {}
      })
    });
  });

  describe('when user is not found', () => {
    beforeAll(() => {
      jest.resetModules();
      jest.mock('../../utils/db.js', () => {
        return {
          updateUser: jest.fn().mockResolvedValue(false),
        };
      });
    })

    afterAll(() => {
      jest.unmock('../../utils/db.js');
    });

    it('should respond with not found', async () => {
      const Users = require('../users.todo');

      const config = makeConfig({
        user: {
          id: 1,
        },
        params: {
          id: 1,
        },
        body: {}
      })

      await Users.updateUser(config.req, config.res);
      expect(config.res.status).toHaveBeenCalledWith(404);
    })
  });
});

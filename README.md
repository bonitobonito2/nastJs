# NastJS

NastJS is a lightweight framework inspired by NestJS, designed to simplify building scalable and modular Node.js applications.

## Installation

To install NastJS, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/nastjs.git
```

## Getting Started

1. Navigate to the `nastjs` directory:

```bash
cd nastjs
```

2. Install the dependencies:

```bash
npm install
```

3. Run project:

```bash
npm run start:dev
```

By default, the application runs on `http://localhost:3000`.

## Creating Modules, Controllers, and Services

To create a new module, controller, and service using NastJS, follow these steps:

1. Create a new TypeScript file for your module:

```typescript
// mymodule.module.ts
import { Module } from "../nast/decorators/module.decorator";
import { MyController } from "./mycontroller.controller";
import { MyService } from "./myservice.service";

@Module({
  provider: [MyService],
  controller: [MyController],
  exports: [],
  imports: [],
})
export class MyModule {}
```

2. Create a new TypeScript file for your controller:

```typescript
// mycontroller.controller.ts
import { Controller } from "../nast/decorators/controller.decorator";
import { Get, Post } from "../nast/decorators/http.decorator";
import { MyService } from "./myservice.service";
import { NastRequest } from "../nast/types/types";

@Controller()
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get("/myroute")
  handleGetRequest(req: NastRequest) {
    // Handle GET request
  }

  @Post("/myroute")
  handlePostRequest(req: NastRequest) {
    // Handle POST request
  }
}
```

3. Create a new TypeScript file for your service:

```typescript
// myservice.service.ts
import { Injectable } from "../nast/decorators/injectable.decorator";

@Injectable("myService")
export class MyService {
  // Service methods and business logic here
}
```

## Dependency Injection

NastJS provides a simple dependency injection system. To use it, follow these steps:

1. Decorate your service with the `@Injectable` decorator:

```typescript
import { Injectable } from "../nast/decorators/injectable.decorator";

In Injectable decorator, you have to put argument a key of service, than u should
use this key in a controller or anywhere u have to use it.

@Injectable("myService")
export class MyService {
  // ...
}
```

2. Inject the service into your controller or other services:

```typescript
import { Controller } from "../nast/decorators/controller.decorator";
import { MyService } from "./myservice.service";

@Controller()
export class MyController {
  constructor(private readonly myService: MyService) {
    // ...
  }

  // ...
}
```

## Routing

NastJS provides decorators to define routes within your controllers. Here's an example:

```typescript
import { Controller } from "../nast/decorators/controller.decorator";
import { Get, Post } from "../nast/decorators/http.decorator";
import { MyService } from "./myservice.service";
import { NastRequest } from "../nast/types/types";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/getUser")
  getUser(req: NastRequest) {
    // Handle GET request for user retrieval
  }

  @Post("/createUser")
  createUser(req: NastRequest) {
    // Handle POST request for user creation
  }
}
```

The `@Controller` decorator sets the base path for all routes defined within the controller.

## Contributing

Contributions to NastJS are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a clear description of your changes.

## License

ISC

```

Please note that the above README assumes that you have cloned the NastJS repository and have access to the source files in the provided structure. Adjust the instructions as necessary based on your project's setup.
```

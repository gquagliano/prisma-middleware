
# prisma-middleware  

Useful middlewares for Prisma ORM. This module includes:

- Soft delete
- Created/updated dates
- Auto type casting

**This is an experimental version**. Please, test your setup thoroughly. And deploy to production at your own risk!

## Install
````
npm i @gquagliano/prisma-middleware
````

You will have to configure the middlewares each time you create a new Prisma Client instance. Our recommendation is to create a file where you manage your Prisma Client instance. For example:

````
import { useAutoCast, useAutoDates, useSoftDelete } from  "@gquagliano/prisma-middleware";
import { Prisma, PrismaClient } from  "@prisma/client";

export  default  async  function  getPrisma() {
	//Initialize once (this is just an example, copy it at your own risk!)
	if(!global.prisma) {
		global.prisma  =  new  PrismaClient();
		useSoftDelete(global.prisma);
		useAutoDates(global.prisma);
		useAutoCast(Prisma, global.prisma);
	}
	return  global.prisma;
}
````

## Soft delete
Adds automatic soft delete to Prisma Client. It works based on a `deletedAt` field, which stores the date of deletion, or `null`. It's applied to *all models* (at the moment it cannot be turned on/off by model).

### Install
1. Add to *every* model:
```
deletedAt  DateTime?
@@index([deletedAt])
```
2. Configure:
````
useSoftDelete(myPrismaClientInstance);
````

## Auto dates
Adds automatic `createdAt` and `updatedAt` dates to Prisma Client. It's applied to *all models* (at the moment it cannot be turned on/off by model).

### Install
1. Add to *every* model:
```
createdAt  DateTime?
updatedAt  DateTime?
@@index([createdAt])
@@index([updatedAt])
```
2. Configure:
````
useAutoDates(myPrismaClientInstance);
````

## Auto type cast
Adds automatic type casting to Prisma Client. It uses the fields definitions to cast values from `where` and `data`s (even nested and inside `include` and `select`), instead of blindly converting every value.

### Install
1. Import/require `Prisma` along with `PrismaClient`:
```
import { Prisma, PrismaClient } from  "@prisma/client";
```
2. Configure:
````
useAutoCast(Prisma, myPrismaClientInstance);
````
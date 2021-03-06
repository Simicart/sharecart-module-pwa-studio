# Share Cart module for Magento PWA Studio

This module acts as an add-on for [Mageplaza's Share Cart extension](https://www.mageplaza.com/magento-2-share-cart/) to make it work with Magento PWA Studio.

End result: https://sharecart.pwa-commerce.com/sharecart/R8HlIx8nrkvbAteKaBvoiAoP0u35DYfu

## Requirements

- Magento version 2.4.* or >= 2.3.5
- Got [Mageplaza Share Cart extension](https://www.mageplaza.com/magento-2-share-cart/) and [Share Cart GraphQL](https://github.com/mageplaza/magento-2-share-cart-graphql) installed

## Installation

### 1. Init project
```
  git clone https://github.com/Simicart/simi-studio --branch release/3.0.0
  cd simi-studio
```

### 2. Start the project

From the root directory of the project you created above, clone the repository:

```
  git clone https://github.com/Simicart/sharecart-module-pwa-studio ./@simicart/sharecart
```

### 3. Modify .env

Change the .env MAGENTO_BACKEND_URL with your Magento site URL, or use our demo URL:

```
  MAGENTO_BACKEND_URL=https://mp2.pwa-commerce.com/
```
### 4. Modify package.json

Modify the dependencies of your project to add extension.

```
  "dependencies": {
    ...
    "@simicart/sharecart": "link:./@simicart/sharecart"
  },
```

### 5. Install and Start Project

```
  yarn install && yarn watch
```

## Contribution

[SimiCart Team](https://www.simicart.com/pwa.html/) & [Mageplaza Team](https://www.mageplaza.com/)


// ... Node
import 'isomorphic-fetch';

import routes from '../../routes/routes';

import visit from '../lib/nightmare';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('Burger menu', () => {
  describe('...', () => {
    const page = visit('/').wait(500);

    Object.keys(routes).forEach((rteGroup) => {
      describe(`group '${rteGroup}' routes`, () => {
        routes[rteGroup].filter(route => !route.noUrl).forEach((route) => {
          const expectedTitleText = route.title;

          it(expectedTitleText, (done) => {
            page.click('.bm-burger-button button').wait(500);

            page.evaluate(
              (routeSpecification, expectedText) => {
                const elements = Array.from(
                  document.querySelectorAll('.bm-menu .bm-item-list a')
                );

                const expectedUrl = routeSpecification.url || routeSpecification.path;

                const got = elements.find(element => (
                  expectedUrl === element.getAttribute('href')
                ));

                if (!got) {
                  throw Error(
                    `Unable to find URL or path for '${JSON.stringify(routeSpecification)}'`
                  );
                }

                const textElement = got.querySelector('span');

                if (!textElement) {
                  throw Error(
                    `Unable to find text (span) for '${JSON.stringify(routeSpecification)}'`
                  );
                }

                // The checks/expectations, START
                const gotHref = got.getAttribute('href');
                if (gotHref !== expectedUrl) {
                  throw Error(`Expected href '${gotHref}' to eq '${expectedUrl}'`);
                }

                const gotText = textElement.innerHTML;
                // const expectedText = routeSpecification.title;
                if (gotText !== expectedText) {
                  throw Error(`Expected text '${gotText}' to eq '${expectedText}'`);
                }
                // The checks/expectations, END

                // Click on the link under test to check the title later
                //   (whether it actually goes to the page).
                got.click();
              },

              route, expectedTitleText
            ).wait(500).evaluate(
              () => {
                const titleElement = document.querySelector('title');
                const gotTitle = titleElement.innerHTML.replace(/\s*\|\s+.*$/, '');
                return gotTitle;
              }
            ).then((gotTitle) => {
              // console.log({ gotTitle, title: route.title });
              // ... sometime this fails
              expect(gotTitle).toBe(route.title);
              done();
            });
          });
        });
      });
    });
  });
});

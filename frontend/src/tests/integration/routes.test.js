
import React from 'react';
import { render as renderer } from 'enzyme';

import RoutesContainer from '../../routes/RoutesContainer';
import routes, { routesMeta } from '../../routes/routes';

import TestReduxContainer from '../lib/redux';
import { routesArray } from '../lib/index';

describe('Routes', () => {
  const wrapper = renderer(
    <TestReduxContainer>
      <RoutesContainer />
    </TestReduxContainer>
  );

  const renderedLinks = wrapper.find('a');

  describe('specifications', () => {
    describe('paths', () => {
      it('should unique', (done) => {
        const routesByPath = routesArray.reduce((memo, { path }) => ({
          ...memo, [path]: memo[path] ? memo[path] + 1 : 1
        }), {});

        Object.keys(routesByPath).forEach((key) => {
          if (routesByPath[key] > 1) {
            console.error(
              `Path '${key}' has a duplicate. Paths must be unique. The routes...\n`,
              routes
            );
            throw Error('...');
          }
        });

        done();
      });
    });

    describe('texts', () => {
      it('should unique', (done) => {
        const routesByText = routesArray.reduce((memo, { text }) => ({
          ...memo, [text]: memo[text] ? memo[text] + 1 : 1
        }), {});

        Object.keys(routesByText).forEach((key) => {
          if (routesByText[key] > 1) {
            console.error(
              `Text '${key}' has a duplicate. Texts must be unique. The routes...\n`,
              routes
            );
            throw Error('...');
          }
        });

        done();
      });
    });
  });

  describe('rendered routes', () => {
    describe('count', () => {
      it(
        `should be the same count as specifications: '${routesMeta.linksCount}'`,
        (done) => {
          expect(renderedLinks.length).toBe(routesMeta.linksCount);
          done();
        }
      );
    });

    describe('links', () => {
      const pathHrefMatches = {};
      const textMatches = {};

      routesArray.forEach((route) => {
        const rSpecPath = route.url || route.path;
        const rSpecText = route.text;
        it(`should match specification: '${rSpecPath}'`, (done) => {
          pathHrefMatches[rSpecPath] = { matches: 0, routeSpec: route };
          textMatches[rSpecText] = { matches: 0, routeSpec: route };

          renderedLinks.each((ix, rLink) => {
            // Cheerio mess...
            const href = rLink.attribs.href;
            const text = rLink.children[1].children[0].data;

            if (href === rSpecPath) {
              pathHrefMatches[rSpecPath] = {
                ...pathHrefMatches[rSpecPath],
                matches: pathHrefMatches[rSpecPath].matches + 1
              };
            }

            if (text === rSpecText) {
              textMatches[rSpecText] = {
                ...textMatches[rSpecText],
                matches: textMatches[rSpecText].matches + 1
              };
            }
          });

          if (pathHrefMatches[rSpecPath].matches !== 1) {
            console.error(
              'Path/href matches !=== 1...\n', pathHrefMatches[rSpecPath]
            );
            throw Error('...');
          }

          if (textMatches[rSpecText].matches !== 1) {
            console.error(
              'Textatches !=== 1...\n', textMatches[rSpecPath]
            );
            throw Error('...');
          }

          done();
        });
      });
    });
  });
});

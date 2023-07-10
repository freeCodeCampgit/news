const selectors = {
  embeddedVideos: {
    fluidWidthVideoContainer: "[data-test-label='fluid-width-video-container']",
    fluidWidthVideoWrapper: "[data-test-label='fluid-width-video-wrapper']",
    ghostEditor: {
      vimeoHeading:
        "[data-test-label='vimeo-link-pasted-into-ghost-editor-heading']",
      youtubeHeading:
        "[data-test-label='youtube-link-pasted-into-ghost-editor-heading']"
    },
    markdown: {
      bilibiliHeading: "[data-test-label='bilibili-embedded-iframe-heading']",
      vimeoHeading: "[data-test-label='vimeo-embedded-iframe-heading']",
      youtubeHeading: "[data-test-label='youtube-embedded-iframe-heading']"
    },
    postContent: "[data-test-label='post-content']"
  }
};

const contexts = [
  {
    title: 'Embedded Videos Page',
    path: '/embedded-videos-page'
  },
  {
    title: 'Embedded Videos Post',
    path: '/embedded-videos-post'
  }
];

describe('Embedded videos', () => {
  contexts.forEach(currContext => {
    context(currContext.title, () => {
      before(() => {
        cy.visit(currContext.path);
      });

      it('should render', () => {
        cy.contains(currContext.title);
      });

      context('Ghost editor', () => {
        it('should render the YouTube video with the expected wrappers and attributes', () => {
          cy.get(selectors.embeddedVideos.ghostEditor.youtubeHeading)
            .next()
            .next()
            .then($el => {
              const figure = $el[0];

              expect(figure.tagName.toLowerCase()).to.equal('figure');
              expect(figure.className).to.equal('kg-card kg-embed-card');
              cy.wrap(figure).find(
                selectors.embeddedVideos.fluidWidthVideoContainer
              );
              cy.wrap(figure)
                .find(selectors.embeddedVideos.fluidWidthVideoWrapper)
                .then($el => {
                  const fluidWidthVideoWrapper = $el[0];

                  expect(fluidWidthVideoWrapper.style.paddingTop).to.exist;
                });
              cy.wrap(figure)
                .find('iframe')
                .then($el => {
                  const iframe = $el[0];

                  expect(iframe.src).to.include(
                    'https://www.youtube.com/embed/rfscVS0vtbw'
                  );
                  expect(iframe.name).to.equal('fitvid0');
                });
            });
        });

        it('should render the Vimeo video with the expected wrappers and attributes', () => {
          cy.get(selectors.embeddedVideos.ghostEditor.vimeoHeading)
            .next()
            .next()
            .then($el => {
              const figure = $el[0];

              expect(figure.tagName.toLowerCase()).to.equal('figure');
              expect(figure.className).to.equal('kg-card kg-embed-card');
              cy.wrap(figure).find(
                selectors.embeddedVideos.fluidWidthVideoContainer
              );
              cy.wrap(figure)
                .find(selectors.embeddedVideos.fluidWidthVideoWrapper)
                .then($el => {
                  const fluidWidthVideoWrapper = $el[0];

                  expect(fluidWidthVideoWrapper.style.paddingTop).to.exist;
                });
              cy.wrap(figure)
                .find('iframe')
                .then($el => {
                  const iframe = $el[0];

                  expect(iframe.src).to.include(
                    'https://player.vimeo.com/video/700486996'
                  );
                  expect(iframe.name).to.equal('fitvid1');
                });
            });
        });
      });

      context('Markdown', () => {
        it('should render the YouTube video with the expected wrappers and attributes', () => {
          cy.get(selectors.embeddedVideos.markdown.youtubeHeading)
            .next()
            .next()
            .then($el => {
              const fluidWidthVideoContainer = $el[0];

              expect(fluidWidthVideoContainer.tagName.toLowerCase()).to.equal(
                'div'
              );
              expect(fluidWidthVideoContainer.className).to.equal(
                'fluid-width-video-container'
              );

              cy.wrap(fluidWidthVideoContainer)
                .find(selectors.embeddedVideos.fluidWidthVideoWrapper)
                .then($el => {
                  const fluidWidthVideoWrapper = $el[0];

                  expect(fluidWidthVideoWrapper.style.paddingTop).to.exist;
                });
              cy.wrap(fluidWidthVideoContainer)
                .find('iframe')
                .then($el => {
                  const iframe = $el[0];

                  expect(iframe.src).to.include(
                    'https://www.youtube.com/embed/PkZNo7MFNFg'
                  );
                  expect(iframe.name).to.equal('fitvid2');
                });
            });
        });

        it('should render the Vimeo video with the expected wrappers and attributes', () => {
          cy.get(selectors.embeddedVideos.markdown.vimeoHeading)
            .next()
            .next()
            .then($el => {
              const fluidWidthVideoContainer = $el[0];

              expect(fluidWidthVideoContainer.tagName.toLowerCase()).to.equal(
                'div'
              );
              expect(fluidWidthVideoContainer.className).to.equal(
                'fluid-width-video-container'
              );

              cy.wrap(fluidWidthVideoContainer)
                .find(selectors.embeddedVideos.fluidWidthVideoWrapper)
                .then($el => {
                  const fluidWidthVideoWrapper = $el[0];

                  expect(fluidWidthVideoWrapper.style.paddingTop).to.exist;
                });
              cy.wrap(fluidWidthVideoContainer)
                .find('iframe')
                .then($el => {
                  const iframe = $el[0];

                  expect(iframe.src).to.include(
                    'https://player.vimeo.com/video/700486996'
                  );
                  expect(iframe.name).to.equal('fitvid3');
                });
            });
        });

        it('should render the Bilibili video with the expected wrappers and attributes', () => {
          cy.get(selectors.embeddedVideos.markdown.bilibiliHeading)
            .next()
            .next()
            .then($el => {
              const fluidWidthVideoContainer = $el[0];

              expect(fluidWidthVideoContainer.tagName.toLowerCase()).to.equal(
                'div'
              );
              expect(fluidWidthVideoContainer.className).to.equal(
                'fluid-width-video-container'
              );

              cy.wrap(fluidWidthVideoContainer)
                .find(selectors.embeddedVideos.fluidWidthVideoWrapper)
                .then($el => {
                  const fluidWidthVideoWrapper = $el[0];

                  expect(fluidWidthVideoWrapper.style.paddingTop).to.exist;
                });
              cy.wrap(fluidWidthVideoContainer)
                .find('iframe')
                .then($el => {
                  const iframe = $el[0];

                  expect(iframe.src).to.include(
                    '//player.bilibili.com/player.html?aid=370761589&bvid=BV1iZ4y1p7kr&'
                  );
                  expect(iframe.name).to.equal('fitvid4');
                });
            });
        });

        it('post content should end with the expected p element', () => {
          cy.get(selectors.embeddedVideos.postContent)
            .find('p')
            .last()
            .then($el => {
              const p = $el[0];

              expect(p.innerText).to.include(
                'Cats secretly make all the worlds muffins.'
              );
            });
        });
      });
    });
  });
});

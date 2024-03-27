const modifyHTMLContent = require('../modify-html-content');
const getImageDimensions = require('../../utils/get-image-dimensions');

const processBatch = async ({ batch, type, currBatchNo, totalBatches }) => {
  console.log(
    `Processing Hashnode ${type} batch ${currBatchNo} of ${totalBatches}...`
  );

  // Process current batch of posts / pages
  const newBatch = [];
  for (const oldPost of batch) {
    const newPost = {};

    // Common fields among posts and pages
    newPost.id = oldPost.id;
    newPost.slug = oldPost.slug;
    newPost.path = `/${oldPost.slug}/`;
    newPost.title = oldPost.title;
    newPost.html = await modifyHTMLContent({
      postContent: oldPost.content.html,
      postTitle: newPost.title
    });

    if (type === 'posts') {
      if (oldPost.coverImage) {
        newPost.feature_image = oldPost.coverImage.url;
        newPost.image_dimensions = {};
        newPost.image_dimensions.feature_image = await getImageDimensions(
          newPost.feature_image,
          newPost.title
        );
      }

      const newPostAuthor = {};
      newPostAuthor.id = oldPost.author.id;
      newPostAuthor.name = oldPost.author.name;
      newPostAuthor.slug = oldPost.author.username;
      newPostAuthor.bio = oldPost.author.bio.text;
      newPostAuthor.location = oldPost.author.location;
      newPostAuthor.website = oldPost.author.socialMediaLinks.website;
      newPostAuthor.twitter = oldPost.author.socialMediaLinks.twitter;
      newPostAuthor.facebook = oldPost.author.socialMediaLinks.facebook;
      newPostAuthor.path = `/author/${oldPost.author.username}/`;
      if (oldPost.author.profilePicture) {
        newPostAuthor.profile_image = oldPost.author.profilePicture;
        newPostAuthor.image_dimensions = {};
        newPostAuthor.image_dimensions.profile_image = await getImageDimensions(
          newPostAuthor.profile_image,
          newPostAuthor.name,
          true
        );
      }
      newPost.primary_author = newPostAuthor;

      newPost.tags = oldPost.tags.map(tag => {
        tag.path = `/tag/${tag.slug}/`;
        // TODO: Setting all tags as public for now. Have to decide how we'll
        // handle private tags.
        tag.visibility = 'public';
        return tag;
      });

      newPost.published_at = oldPost.publishedAt;
      newPost.updated_at = oldPost.updatedAt
        ? oldPost.updatedAt
        : oldPost.publishedAt;
      newPost.reading_time = oldPost.readTimeInMinutes;
    }

    newBatch.push(newPost);
  }

  return newBatch;
};

module.exports = processBatch;

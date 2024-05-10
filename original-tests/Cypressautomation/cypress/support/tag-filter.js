// Tag filtering support
// This file is imported in support/e2e.js

// This plugin will filter tests based on the tags in the test title
beforeEach(function () {
    const testTags = this.currentTest.title.match(/@\w+/g) || [];
    const envTags = Cypress.env('tags');

    if (envTags) {
        // If we're using OR syntax, handle it
        if (envTags.includes(' or ')) {
            const tagList = envTags.split(' or ').map(tag => tag.trim());
            // Check if any of the environment tags matches any of the test tags
            const hasMatchingTag = tagList.some(tag => testTags.includes(tag));
            if (!hasMatchingTag) {
                this.skip();
            }
        } else {
            // For a single tag
            if (!testTags.includes(envTags)) {
                this.skip();
            }
        }
    }
}); 
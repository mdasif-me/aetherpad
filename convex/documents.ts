import { paginationOptsValidator } from 'convex/server';
import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, { title, initialContent }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('User not authenticated');
    }
    return await ctx.db.insert('documents', {
      title: title || 'Untitled Document',
      initialContent: initialContent,
      ownerId: user.subject,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('User not authenticated');
    }

    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts);
    }
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, { id }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('User not authenticated');
    }
    const document = await ctx.db.get(id);
    if (!document) {
      throw new ConvexError('Document not found');
    }
    const is_owner = document.ownerId === user.subject;
    if (!is_owner) {
      throw new ConvexError('User not authorized to delete this document');
    }
    await ctx.db.delete(id);
  },
});
export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.string(),
  },
  handler: async (ctx, { id, title }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('User not authenticated');
    }
    const document = await ctx.db.get(id);
    if (!document) {
      throw new ConvexError('Document not found');
    }
    const is_owner = document.ownerId === user.subject;
    if (!is_owner) {
      throw new ConvexError('User not authorized to update this document');
    }
    await ctx.db.patch(id, { title: title });
  },
});

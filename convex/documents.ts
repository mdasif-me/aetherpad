import { paginationOptsValidator } from 'convex/server';
import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

//=== create document ===//
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
    const orgId = (user.organization_id ?? undefined) as string | undefined;
    return await ctx.db.insert('documents', {
      title: title || 'Untitled Document',
      initialContent: initialContent,
      organizationId: orgId,
      ownerId: user.subject,
    });
  },
});

//=== get documents ===//
export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    //=== check user ===//
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('User not authenticated');
    }
    const orgId = (user.organization_id ?? undefined) as string | undefined;

    //=== search with organization ===//
    if (search && orgId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q
            .search('title', search)
            .eq('ownerId', user.subject)
            .eq('organizationId', orgId)
        )
        .paginate(paginationOpts);
    }

    //=== search without organization ===//
    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts);
    }

    //=== all docs inside organizations ===//
    if (orgId) {
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', (q) => q.eq('organizationId', orgId))
        .paginate(paginationOpts);
    }

    //=== all docs inside user ===//
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts);
  },
});

//=== remove document by id ===//
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
    const is_org_member = !!(
      document.organizationId &&
      document.organizationId === user.organization_id
    );
    if (!is_owner && !is_org_member) {
      throw new ConvexError('User not authorized to delete this document');
    }
    await ctx.db.delete(id);
  },
});

//=== update document by id ===//
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
    const is_org_member = !!(
      document.organizationId &&
      document.organizationId === user.organization_id
    );
    if (!is_owner && !is_org_member) {
      throw new ConvexError('User not authorized to update this document');
    }
    await ctx.db.patch(id, { title: title });
  },
});

//=== get document by id ===//
export const getById = query({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

import { Injectable } from '@nestjs/common';
import { Context, Transactional } from '@3wks/gae-node-nestjs';
import * as uuid from 'node-uuid';
<% if (includeRepository) { %> import { <%= module %>Repository, <%= typeName %> } from './<%= moduleSlugged %>.repository';
import { QueryInfo } from '@google-cloud/datastore/query';<% } %>

@Injectable()
export class <%= module %>Service { 
  constructor(
    <% if (includeRepository) { %>
      private readonly repository: <%= module %>Repository,
    <% } %>
  ) { }


  <% if (includeRepository) { %>
    async getAll(context: Context, limit?: number, cursor?: string): Promise<[ReadonlyArray<<%= typeName %>>, QueryInfo]> {
      return await this.repository.query(context, {
        limit,
        start: cursor
      });
    }

    async getById(context: Context, id: string): Promise<<%= typeName %> | undefined> {
      return this.repository.get(context, id);
    }

    async create(context: Context, <%= lowerTypeName %>: <%= typeName %>): Promise<<%= typeName %>> {
      return await this.repository.save(context, {
        ...<%= lowerTypeName %>,
        id: uuid.v4(),
      });
    }

    @Transactional()
    async update(context: Context, id: string, <%= lowerTypeName %>: <%= typeName %>): Promise<<%= typeName %> | undefined> {
      const current = await this.repository.get(context, id);

      if (! current) {
        return undefined;
      }

      return await this.repository.save(context, {
        ...<%= lowerTypeName %>,
        id,
      });
    }

    async delete(context: Context, id: string): Promise<void> {
      return await this.repository.delete(context, id);
    }
  <% } %>
} 
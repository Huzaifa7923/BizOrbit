import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocsInfoService } from './docs_info.service';
import { DocsInfo } from './entities/docs_info.entity';
import { CreateDocsInfoInput } from './dto/create-docs_info.input';
import { UpdateDocsInfoInput } from './dto/update-docs_info.input';

@Resolver(() => DocsInfo)
export class DocsInfoResolver {
  constructor(private readonly docsInfoService: DocsInfoService) {}

  @Mutation(() => DocsInfo)
  createDocsInfo(@Args('createDocsInfoInput') createDocsInfoInput: CreateDocsInfoInput) {
    return this.docsInfoService.create(createDocsInfoInput);
  }

  @Query(() => [DocsInfo], { name: 'docsInfo' })
  findAll() {
    return this.docsInfoService.findAll();
  }

  @Query(() => DocsInfo, { name: 'docsInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.docsInfoService.findOne(id);
  }

  @Mutation(() => DocsInfo)
  updateDocsInfo(@Args('updateDocsInfoInput') updateDocsInfoInput: UpdateDocsInfoInput) {
    return this.docsInfoService.update(updateDocsInfoInput.id, updateDocsInfoInput);
  }

  @Mutation(() => DocsInfo)
  removeDocsInfo(@Args('id', { type: () => Int }) id: number) {
    return this.docsInfoService.remove(id);
  }
}

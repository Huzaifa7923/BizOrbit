import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeaturesService } from './features.service';
import { Feature } from './entities/feature.entity';
import { CreateFeatureInput } from './dto/create-feature.input';
import { UpdateFeatureInput } from './dto/update-feature.input';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Mutation(() => Feature)
  createFeature(@Args('name') name : string) {
    return this.featuresService.create(name);
  }

  @Query(() => [Feature], { name: 'features' })
  findAll() {
    return this.featuresService.findAll();
  }

  @Query(() => Feature, { name: 'feature' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.featuresService.findOne(id);
  }

  @Mutation(() => Feature)
  updateFeature(@Args('updateFeatureInput') updateFeatureInput: UpdateFeatureInput) {
    return this.featuresService.update(updateFeatureInput.id, updateFeatureInput);
  }

  @Mutation(() => Feature)
  removeFeature(@Args('id', { type: () => Int }) id: number) {
    return this.featuresService.remove(id);
  }
}

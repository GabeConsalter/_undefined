import 'react-native';
import React from 'react';
import Quest from '../src/scenes/Quest';
import renderer from 'react-test-renderer';

it('Quest renders correctly', () => {
  const quest = renderer.create(
    <Quest/>
  );
});
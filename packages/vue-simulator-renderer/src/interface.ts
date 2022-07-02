import { Component, ComponentPublicInstance, App } from 'vue';
import { ComponentSchema, NpmInfo, RootSchema } from '@alilc/lowcode-types';
import { BuiltinSimulatorRenderer, DocumentModel, Node } from '@alilc/lowcode-designer';
import { Router } from 'vue-router';

export type MinxedComponent = NpmInfo | Component | ComponentSchema;

export type ComponentInstance = ComponentPublicInstance;

export interface SimulatorViewLayout {
  Component?: Component;
  componentName?: string;
  props?: Record<string, unknown>;
}

export interface VueSimulatorRenderer extends BuiltinSimulatorRenderer {
  app: App;
  router: Router;
  layout: SimulatorViewLayout;
  device: string;
  locale: string;
  designMode: 'design';
  libraryMap: Record<string, string>;
  components: Record<string, Component>;
  autoRender: boolean;
  componentsMap: Record<string, MinxedComponent>;
  documentInstances: DocumentInstance[];
  requestHandlersMap: Record<string, CallableFunction>;
  dispose(): void;
  rerender(): void;
  getCurrentDocument(): DocumentInstance | undefined;
}

export interface DocumentInstance {
  readonly id: string;
  readonly key: string;
  readonly path: string;
  readonly device: string;
  readonly document: DocumentModel;
  readonly instancesMap: Map<string, ComponentInstance[]>;
  readonly schema: RootSchema;
  readonly components: Record<string, Component>;
  readonly componentsMap: Record<string, MinxedComponent>;
  readonly designMode: string;
  readonly requestHandlersMap: Record<string, CallableFunction>;
  getComponentInstance(id: number): ComponentInstance | null;
  mountInstance(id: string, instance: ComponentInstance): (() => void) | void;
  unmountIntance(id: string, instance: ComponentInstance): void;
  dispose(): void;
  rerender(): void;
  getNode(id: string): Node | null;
}

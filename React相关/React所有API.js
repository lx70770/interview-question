/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 14:37:41
 * @LastEditTime: 2019-10-01 21:39:15
 * @LastEditors: Please set LastEditors
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * React全局入口文件 导出React核心API
 */

import ReactVersion from "shared/ReactVersion"; // React版本号
import {
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE
} from "shared/ReactSymbols"; // React一些常量

import { Component, PureComponent } from "./ReactBaseClasses";
import { createRef } from "./ReactCreateRef";
import { forEach, map, count, toArray, only } from "./ReactChildren";
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
  jsx
} from "./ReactElement";
import { createContext } from "./ReactContext";
import { lazy } from "./ReactLazy";
import forwardRef from "./forwardRef";
import memo from "./memo";
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useResponder
} from "./ReactHooks";
import { withSuspenseConfig } from "./ReactBatchConfig";
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
  jsxWithValidation,
  jsxWithValidationStatic,
  jsxWithValidationDynamic
} from "./ReactElementValidator";
import ReactSharedInternals from "./ReactSharedInternals";
import createFundamental from "shared/createFundamentalComponent";
import createResponder from "shared/createEventResponder";
import {
  enableJSXTransformAPI,
  enableFlareAPI,
  enableFundamentalAPI
} from "shared/ReactFeatureFlags";
const React = {
  Children: {
    map, // 子元素需要返回大于一个才可以使用
    forEach, // 子元素需要返回大于一个才可以使用
    count, // 计算有多少个子元素
    toArray, // 转化子元素为一个数组
    only // 强制只有一个子元素
  },

  createRef, // √
  Component,
  PureComponent,

  createContext, // √
  forwardRef, // √
  lazy, // √
  memo, // √

  // hooks
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment: REACT_FRAGMENT_TYPE, // √
  Profiler: REACT_PROFILER_TYPE, // 升级版React dev tool
  StrictMode: REACT_STRICT_MODE_TYPE, // √
  Suspense: REACT_SUSPENSE_TYPE, // √
  unstable_SuspenseList: REACT_SUSPENSE_LIST_TYPE,

  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_withSuspenseConfig: withSuspenseConfig,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

if (enableFlareAPI) {
  React.unstable_useResponder = useResponder;
  React.unstable_createResponder = createResponder;
}

if (enableFundamentalAPI) {
  React.unstable_createFundamental = createFundamental;
}

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableJSXTransformAPI) {
  if (__DEV__) {
    React.jsxDEV = jsxWithValidation;
    React.jsx = jsxWithValidationDynamic;
    React.jsxs = jsxWithValidationStatic;
  } else {
    React.jsx = jsx;
    // we may want to special case jsxs internally to take advantage of static children.
    // for now we can ship identical prod functions
    React.jsxs = jsx;
  }
}

export default React;

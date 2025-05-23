'use strict';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

const traceExporter = new OTLPTraceExporter({
  url: 'http://0.0.0.0:4317', // Jaeger endpoint for OTLP
});
const sdk = new NodeSDK({
  traceExporter,
  serviceName: 'elton-app-solutis',
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new NestInstrumentation(),
    new PinoInstrumentation(),
  ],
});

sdk.start();

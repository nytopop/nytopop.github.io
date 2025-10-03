.PHONY: preview dev clean gpt-oss-20b granite4-7b

dist: clean src/version.ts
	npm install
	npm run build

preview: dist
	npm run preview

dev: clean src/version.ts
	npm run dev

clean:
	rm -rf src/version.ts dist

src/version.ts:
	echo 'export const VERSION: string = "$(shell git describe --always --dirty)";' > src/version.ts
	echo 'export const VERSION_CLEAN: string = "$(shell git describe --always)";' >> src/version.ts

.venv:
	uv venv --python 3.12 $@
	uv pip install vllm

VLLM := .venv/bin/vllm

ARGS := --gpu-memory-utilization 0.8

gpt-oss-20b: .venv
	$(VLLM) serve openai/gpt-oss-20b $(ARGS) --tool-call-parser openai --reasoning-parser openai_gptoss

granite4-7b: .venv
	$(VLLM) serve ibm-granite/granite-4.0-h-tiny $(ARGS) --tool-call-parser hermes --enable-auto-tool-choice

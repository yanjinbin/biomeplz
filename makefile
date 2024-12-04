# 变量定义
namespace=biomeplz
Version=`git describe --tag  --abbrev=0`
build_time=`date +%FT%T%z`
commit_hash=`git rev-parse --short HEAD`
PORT = 5173  # 要杀死进程的端口号
PID = $(shell lsof -t -i :$(PORT))  # 获取占用指定端口的进程ID


run: stop
	vite . --port $(PORT)

stop:
	@if [ -n "$(PID)" ]; then \
		echo "Killing process with PID $(PID) that is using port $(PORT)..."; \
		kill -9 $(PID); \
	else \
		echo "No process found occupying port $(PORT)."; \
	fi

.PHONY: notify-bot
notify-bot: run-background
	@sh notify-bot.sh

# 基础cli

.PHONY: run-background
run-background:
	@nohup make run > output.log 2>&1 &

.PHONY: pre-hook-setup
pre-hook-setup:
	@brew install pre-commit
	@pip3 install pre-commit
	@pre-commit install
	@pre-commit install --hook-type commit-msg



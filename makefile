namespace=biomeplz
Version=`git describe --tag  --abbrev=0`
build_time=`date +%FT%T%z`
commit_hash=`git rev-parse --short HEAD`


pre-hook-setup:
	@brew install pre-commit
	@pip3 install pre-commit
	@pre-commit install
	@pre-commit install --hook-type commit-msg


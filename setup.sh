#!/bin/zsh

DIR="$(dirname "$(realpath "$0")")"

################################################################
# Getting ready
################################################################

package_file=$DIR/package.json
readme_file=$DIR/README.md

echo -n "이름: "
read name

echo -n "설명: "
read description

echo -n "저장소: "
read repository

################################################################
# package.json
################################################################

sed -i "" "s|__NAME__|$name|g" $package_file
sed -i "" "s|__DESCRIPTION__|$description|g" $package_file
sed -i "" "s|__REPOSITORY__|$repository|g" $package_file

echo "package.json 설정 완료."

################################################################
# README.md
################################################################

readme_file_content="# $name\n\n$description"

echo $readme_file_content > $readme_file

echo "README.md 설정 완료."

################################################################
# Finishing
################################################################

echo ""
echo "이 스크립트를 삭제합니다."
read

rm $DIR/setup.sh

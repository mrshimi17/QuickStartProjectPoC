cd tmp ; echo "Moving to Test Directory"
git clone $1 ; echo "Cloning Newly created repo"
cd ..
mkdir loopback-next ; echo "Creating loopback-next directory"
cd loopback-next ; echo "Moving to loopback-next directory"
git init ; echo "git init"
pwd ; echo "Current Directory"
git remote add origin -f https://github.com/strongloop/loopback-next.git ; echo "git remote add origin"
git config core.sparsecheckout true ; echo "git config"
echo "examples/hello-world/*" >> .git/info/sparse-checkout ; echo "git checkout"
git branch
git remote
pwd ; echo "Pulling to current directory"
git pull --depth=2 origin master ; echo "git pull"
cd ..
rsync loopback-next/examples/hello-world/* -av -progress tmp/$2/
rsync loopback-next/examples/hello-world/.??* -av -progress tmp/$2/
rm -rf loopback-next/
rsync Jenkinsfile -av -progress tmp/$2/
cd tmp/$2
sed -i '' -e 's|${REPO_PATH}|'$1'|g' Jenkinsfile
git add */.*
git commit -m 'Initializing repo with hello-world repo files'
git push origin master

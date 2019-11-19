![](http://magicshifter.net/img/logo.png)
# MagicShifter Onboard WebInterface

License
-------
This Software is licensed to you under the [AGPL License.](http://www.gnu.org/licenses/agpl.html)
Any use of this software implies agreement with this license.

=======
Usage:
-------
```bash
  git clone git@github.com:magicshifter/ms3000-webinterface
  cd ms3000-webinterface
  make install

  # the development environment is currently broken.
  # to get the app to run, 
  make build # this builds to dist

  cd dist && python -m SimpleHTTPServer

  # client is now served at localhost:8000
```
=======

See
```bash
make help
```
for more instructions
